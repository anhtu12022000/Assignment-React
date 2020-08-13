import React, { useEffect,useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { useForm } from "react-hook-form";
import { listProducts } from 'actions/productActions';
import { saveContact } from 'actions/userActions';
import { useDispatch,useSelector } from 'react-redux';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 300,
    },
  },
}));


const ContactScreen = () => {
  //Validate form
  const { handleSubmit, register, errors } = useForm();
  const classes = useStyles();

  const contactSave = useSelector(state => state.contactSave);
  const {loading, success, error} = contactSave;

  const [toggle, setToggle] = useState(true);

  const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listProducts());
        return () => {
          
        }
      }, [])

    if (success) {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
     }
 
  
  const submitHandler = (values) => {
     dispatch(saveContact(values.name, values.email, values.subject, values.context));
     setToggle(false); 
  }

    return (   
      <div>
      <div className="about-header">
                <img width="100%" src="/images/amazon.jpg" />
                <Link className="about-text" href="https://blog.aboutamazon.co.uk/amazons-actions-to-help-employees-communities-and-customers-affected-by-covid-19" data-cms-ai="0">
                    Amazon’s actions to help employees, communities, and customers affected by COVID-19
                </Link>
            </div>
    <form onSubmit={handleSubmit(submitHandler)} id="contact" className={classes.root} autoComplete="off">
        <h1 className="center">Contact Form </h1>
        {loading && <div>Loading...</div>}
        {error && <div className={classes.root}>
            <Alert severity="danger">Send contact form error! Please try again</Alert>
          </div>
        }
        {success && <div className={classes.root}>
            <Alert severity="info">Send contact form successfully!</Alert>
          </div>
        }
        <div className="group-input">
            <div className="input">
            <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name" placeholder="Enter Name" ref={register({
                  required: "Name can't be empty"
                  })} />
              <div className="error">* {errors.name && errors.name.message}</div>
            </div>

            <div className="input">       
            <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" placeholder="Enter Email" ref={register({
                   required: "Email can't be empty",
                            pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address"
                       }
                    })} />
                  <div className="error">* {errors.email && errors.email.message}</div>  
            </div>     
        </div>
        <div className="group-input">
        <div className="input">
            <label htmlFor="subject">Subject</label>
              <input type="text" name="subject" id="subject" placeholder="Enter Subject" ref={register({
                  required: "Subject can't be empty"
                  })} />
              <div className="error">* {errors.subject && errors.subject.message}</div>
            </div>
        </div>
        <div className="group-input">
          <div className="input">
            <label htmlFor="context">Context</label>
            <textarea id="context" placeholder="Enter Context" name="context" ref={register({
                  required: "Context can't be empty"
                  })} />
                <div className="error">* {errors.context && errors.context.message}</div>
          </div>
        </div>
      <div className="center">
      {toggle && <Button type="submit" variant="outlined" endIcon={<Icon>send</Icon>} color="secondary" style={{padding: '6px 30px'}} >
          Send 
      </Button>}
      </div>
    </form>
    </div>
    );
}

export default ContactScreen;
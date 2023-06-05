import { DotSpinner } from '@uiball/loaders';

//esto muestra solo instalando el npm i @uiball/loaders

export const Loader = () => {
	return (
        <div className="container-loader">
            <DotSpinner size={40} speed={0.9} color='black' />
        </div>
    )
};
